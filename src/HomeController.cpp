/******************************************************/
//       THIS IS A GENERATED FILE - DO NOT EDIT       //
/******************************************************/

#line 1 "/Users/joohokim/Desktop/CSE222S/project-hamic_kim_project/src/HomeController.ino"
#include "Arduino.h"
#include <SPI.h>
#include <MFRC522.h>

//below is reference for the MFRC522 code
//https://www.viralsciencecreativity.com/post/arduino-rfid-solenoid-lock
//All actions are delayed by 10ms. 
//Button will not do anything before 120ms pass after the button is pressed (Debouncing)
void setupHardware();
void doorSet(String newState);
void dangerSet(String newState);
void lightSet(String newState);
void acSet(String newState);
void buttonUpdates();
void btnPress1();
void btnPress2();
void btnPress3();
void btnPress4();
void stateProcess();
void setup();
void loop();
int setLightState (String args);
int setACState (String args);
int setDoorState (String args);
int setAutoOffState (String args);
int setAutoOffTime(String newTime);
int setAlarmState (String args);
int publishStateHelper(String temp);
int publishState();
#line 9 "/Users/joohokim/Desktop/CSE222S/project-hamic_kim_project/src/HomeController.ino"
const int delayTime = 10;
const int debounceTime = 120;
const int debounceCounter = debounceTime / delayTime;
Timer timer(delayTime, stateProcess);

// Pin definitions
#define SS_PIN 9
#define RST_PIN 10
#define BTN1 D8
#define BTN2 D7
#define BTN3 D6
#define BTN4 D5

#define LEDG D4
#define LEDB D3
#define LEDW D2

#define BUZZER D1
#define MOTOR A4
#define PIR A3

// button debouncing counters
int btnCounter1 = 0;
int btnCounter2 = 0;
int btnCounter3 = 0;
int btnCounter4 = 0;
int pirCounter = 0;

// state variables
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.
String alarmState = "OFF";
String danger = "NONE";
String lightState = "OFF";
String acState = "OFF";
String autoOff = "DISABLED";
double autoOffTime = 10000.0;
double currentTimer = 10000.0;
bool acAutoState = false;
String doorState = "LOCKED";
bool accessGranted = false;

bool publishStateNow = false;
//hardware setup
void setupHardware() {
  pinMode(BTN1, INPUT_PULLUP);
  pinMode(BTN2, INPUT_PULLUP);
  pinMode(BTN3, INPUT_PULLUP);
  pinMode(BTN4, INPUT_PULLUP);

  pinMode(LEDG, OUTPUT);
  pinMode(LEDB, OUTPUT);
  pinMode(LEDW, OUTPUT);

  pinMode(BUZZER, OUTPUT);
  pinMode(MOTOR, OUTPUT);
  pinMode(PIR, INPUT_PULLDOWN);
}
//door controller
void doorSet(String newState) {
  doorState = newState;
  publishStateNow = true;
  if (newState.equals("LOCKED")) {
    digitalWrite(LEDG, LOW);
    digitalWrite(LEDB, HIGH);
  } else if (newState.equals("UNLOCKED")){
    digitalWrite(LEDG, HIGH);
    digitalWrite(LEDB, LOW);
  }
}
//dangerous activity controller
void dangerSet(String newState) {
  danger = newState;
  publishStateNow = true;
  if (newState.equals("YES")) {
    digitalWrite(BUZZER, HIGH);
  } else if (newState.equals("NONE")){
    digitalWrite(BUZZER, LOW);
  }
}
//light state controller
void lightSet(String newState) {
  lightState = newState;
  publishStateNow = true;
  if (lightState.equals("ON")) {
    digitalWrite(LEDW, HIGH);
  } else {
    digitalWrite(LEDW, LOW);
  }
}
//air conditioner controller
void acSet(String newState) {
  acState = newState;
  publishStateNow = true;
  if (acState.equals("ON")) {
    digitalWrite(MOTOR, HIGH);
  } else {
    digitalWrite(MOTOR, LOW);
  }
}

//listens for buttons
void buttonUpdates() {
  
  Serial.println(pirCounter);
  if (digitalRead(BTN1) == LOW) btnCounter1++;
  else btnCounter1 = 0;

  if (digitalRead(BTN2) == LOW) btnCounter2++;
  else btnCounter2 = 0;

  if (digitalRead(BTN3) == LOW) btnCounter3++;
  else btnCounter3 = 0;

  if (digitalRead(BTN4) == LOW) btnCounter4++;
  else btnCounter4 = 0;


  if (btnCounter1 == debounceCounter) btnPress1();
  if (btnCounter2 == debounceCounter) btnPress2();
  if (btnCounter3 == debounceCounter) btnPress3();
  if (btnCounter4 == debounceCounter) btnPress4(); 
}

void btnPress1() {
  if(lightState.equals("ON")) {
    lightSet("OFF");
  }
  else {
    lightSet("ON");
  }
}

void btnPress2() {
  if(acState.equals("ON")) {
    acSet("OFF");
  }
  else {
    acSet("ON");
  }
}

void btnPress3() {
  if(alarmState.equals("ON")) {
    if(danger.equals("NONE")) {
      dangerSet("YES");
    }
    else {
      dangerSet("NONE");
    }
  }
}

void btnPress4() {
  if(doorState.equals("UNLOCKED")) {
    doorSet("LOCKED");
  }
}
//listens for the timer to update
void stateProcess() {
  buttonUpdates();

  if(autoOff.equals("ENABLED") && acState.equals("ON")) {
    if(currentTimer>0) {
      currentTimer = currentTimer - delayTime;
    }
    else {
      acSet("OFF");
    }
  }
  else {
    currentTimer = autoOffTime;
  }

}



void setup() {
  setupHardware();
  Serial.begin(9600);
  Serial.println("Put your card to the reader...");
  SPI.begin();          // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
  Particle.function("publishState", publishStateHelper);
  Particle.function("setLightState", setLightState);
  Particle.function("setACState", setACState);
  Particle.function("setAutoOffState", setAutoOffState);
  Particle.function("setAutoOffTime", setAutoOffTime);

  Particle.function("setDoorState", setDoorState);
  Particle.function("setAlarmState", setAlarmState);
  timer.start();
  publishStateNow = true;
  doorSet(doorState);

  //Start timer 
}
long long lastTime = 0;
void loop() {
  if (millis() > lastTime + 1000) {
    lastTime = millis();
    if(publishStateNow) {
      publishState();
      publishStateNow = false;
    }
  }

  //checks to see if there is a card and it is the right card
  if(mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial()) {
    //Show UID on serial monitor
    Serial.print("UID tag :");
    String content= "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
      Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
      Serial.print(mfrc522.uid.uidByte[i], HEX);
      content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
      content.concat(String(mfrc522.uid.uidByte[i], HEX));
    }
    Serial.println();
    Serial.print("Message : ");
    content.toUpperCase();
    if (content.substring(1) == "DA 59 83 82") //change here the UID of the card/cards that you want to give access
    {
      doorSet("UNLOCKED");
    }
  }
}

//sets light state
int setLightState (String args) {
  if (args.equals("ON")) {
    lightSet("ON");
  } else {
    lightSet("OFF");
  }
  return 0;
}
//sets air conditioning state 
int setACState (String args) {
  if (args.equals("ON")) {
    acSet("ON");
  } else {
    acSet("OFF");
  }
  return 0;
}
//sets door state
int setDoorState (String args) {
  if(args.equals("UNLOCKED")) {
    doorSet("UNLOCKED");
  }
  else if(args.equals("LOCKED")) {
    doorSet("LOCKED");
  }
  return 0;
}
//sets autooff state and publishes instantly
int setAutoOffState (String args) {
  if(args.equals("ENABLED")) {
    autoOff = args;
    publishStateNow = true;
  }
  else {
    autoOff = args;
    publishStateNow = true;
  }
  return 0;
}
//sets autotime state and publishes instantly
int setAutoOffTime(String newTime) {
  autoOffTime = newTime.toInt() * 1000.0;
  currentTimer = autoOffTime;
  publishStateNow = true;
  return 0;
}

//sets alarm state and publishes instantly
int setAlarmState (String args) {
  if (args.equals("ON")) {
    alarmState = args;
    publishStateNow = true;
  } else {
    alarmState = args;
    publishStateNow = true;
  }
  return 0;
}


const String topic = "cse222/garageDoor";

int publishStateHelper(String temp) {
    return publishState();
}

//publish state function with correctly formatted json data
int publishState() {
  String data = "{";
  if(doorState.equals("UNLOCKED")) {
    data = data + "\"ds\":\"UNLOCKED\"";
  } else {
    data = data + "\"ds\":\"LOCKED\"";
  }

  if(lightState.equals("ON")) {
    data = data + ",\"ls\":\"ON\"";
  } else {
    data = data + ",\"ls\":\"OFF\"";
  }

  if(acState.equals("ON")) {
    data = data + ",\"acs\":\"ON\"";
  } else {
    data = data + ",\"acs\":\"OFF\"";
  }

  if(alarmState.equals("ON")) {
    data = data + ",\"as\":\"ON\"";
  }
  else {
    data = data + ",\"as\":\"OFF\"";
  }

  if(autoOff.equals("ENABLED")) {
    data = data + ",\"auoff\":\"ENABLED\"";
  }
  else {
    data = data + ",\"auoff\":\"DISABLED\"";
  }

  if(danger.equals("YES")) {
    data = data + ",\"danger\":\"YES\"";
  }
  else {
    data = data + ",\"danger\":\"NONE\"";
  }

  data = data + ",\"aot\":\"" + String((int)(autoOffTime/1000.0)) + "\"";


  data += "}";

  Particle.publish(topic, data, 60,PRIVATE);
  return 0;

}

