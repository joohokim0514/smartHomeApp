
# 1. Description

Our project will be a Smart Home Security and Management System. The service will be widely useful for any household living in non-apartment houses. Considering there are only a handful of people living in apartments in the United States, the product targets a wide spectrum of clients. Individuals or families living in apartments will not favor this security and management system because the security system will start an alarm that could be disturbing for closeby neighbors. However, apartment households are welcome to use our product as clients could turn off the alarm function and simply utilize the management system. Those living in seperate houses will greatly appreciate the simplicity and convenience of our product because it will provide a smart way to monitor your house of any harm as well as manage systems inside your house such as the house light and air conditioner.

There are several important problems that our product hopes to address. First many families live in individual houses by the street. Therefore there are no universal security systems or guards as one would see in apartment buildings. Unwanted visitors could simply walk up to the door and linger around posing danger to those who are in the house or valuable items that the house owner keeps. Many houses are directly exposed to harmful situations and there is really nothing that alerts or even monitors these potential harms. To solve this problem, we will introduce a security service as a mina aspect of our product. The security system hardware will compose mainly of an alarm and a smart key. The door will only open when this smart key has contacted the smart key sensor and will not be vulnerable to lock pickers. We realize that many houses still use manual keys and locks to keep their property secure, but this can be a serious issue because keys may be duplicated or simply lock pickers can come by to test them out. Ideally, this smart key and recognition system will keep these harms at the minimum with very low costs and high conveniency. Users will simply tap their key on the recognition board and the door will open if the key is a valid one. 

Another problem that many property owners face is the lack of alarm and alert systems embedded into the security service. When unwanted visitors come in or linger around the front porch, there is really no alarm or system that records or monitors this situation. Therefore, whether the owner is in their house or not, their property will be exposed to harm for possibly hours without any alarm and solution. To solve this issue, our product implements a alarm system that will ring when unwanted behavior is detected around the house. Users who have expected visitors or simply does not want to utilize this alarm service can manually turn it off on their controller or portable device. Therefore, this creates freedom and a choice for the clients to use this alarm service to their appropriate needs. 

Diverging from security and moving onto smart property management, there has been an increasingly large amount of new products related to smart home management over the past few years. Yet, many households are indifferent towards the products because perhaps humans are creatures of habit. However, this smart management system, as a element of our hollistic product can be installed and used without much hassle. Those who want to elevate their home security by using our product will also recieve the benefit of using our smart home management service. Note that during very hot summers, people will be disturbed by the unusually high temperature of their house when they come back from work. Indoor temperature is always higher than outdoor temperature without air conditioning because of the insulation caused by a closed space. This is why people often find their cars to be very hot during the day in the summer. Thus, we would like to address this problem with our product simply by allowing the user to remotely control the air conditioner with their portable device. The user can turn on the air conditioner during outdoor activities. This will be vastly useful when looking after infants because parents at work can control the air conditioner to ensure a pleasant atmosphere for their children at home. 

The last additional feature that we wanted to add onto our product is remote controlled house lights. This will be useful in the example mentioned above as users can turn on the lights for infants or for house pets when it gets too dark. Also, many people sometime like their house to be lighted up when they are on a trip or simply not at home because the idea of an occupied house(faked by the lights) can reduce the danger of possible threats such as burglary. This feature will always be convenient in the opposite case where a user might want to turn off the lights. They might have been in a rush leaving for work and might have forgotten to turn off the lights. Ultimately, it is a convenient addon feature that will give more remote access to the many elements in the house. 

Now since we have had an overview of the solutions to the potential issues this product will address, we would like to present the benefits and value of our product. The most important value that our product will help to address is the well-being of our clients. Nothing is more important than fulfilling a convenient and relaxing experience at all times. The security service will ensure that home owners are not exposed to any form of harm and if they are, then the alarm and monitoring system will promise a fast and effective way of eradicating such danger. Therefore, users can relax when they are at home or even when they are away from home because they can monitor and control the smart security features of their house from anywhere at anytime of the day. The smart home management service will also promote the well-being of our clients because it is simply convenient. We would like users to control important features of their home at anytime and anywhere. Also, users will not have to worry about forgetting to turn off their lights or the air conditioner because our app will provide a remote control solution. We would ultimately like the house to be fully manageable in any condition because we think that the house is perhaps the most valuable and important property a person or family could physically own. 

The use of IoT is incredibly beneficial for everyone because communication is not only useful for humans but also for machines. Humans can collect and gather more data and information through having converations with each other and this network of information has been the key to development. We believe that machines are no exception. It is rather more convincing to say that machines can store much more data than humans and even in a much more intricate way. Therefore, if only hardwares could communicate live data and stored information with each other, then this could create a much more convenient environment to humans. Unlike humans, machines can exchange data at very high speed and without much restrictions so the cost of such IoT usage is cosiderably low. Such cheap but valuable communication between machines will enable more personalization. Personalization is the key here because every human is unique and they want the day to day product they use to be geared towards their habits. If this can be achieved through machines communicating with each other through various services such as bluetooth or wi-fi we believe it is definitely worth doing so.

Finally, the costs associated with installing and implementing IoT is trivial compared to the benefits presented above. We would argue that maintenance and financial costs are very small since there is really nothing to maintain. The system and software will maintain itself as soon as it has been installed. In addition, the development costs for us producers are not serious issues because we simply need to make a User Interface or *app* for the hardware. The app will maintain the states of the actual hardware and will update once an action is sent to the agent and the agent responds with the updated states. Here, the agent would correspond to the various IoT services such as the smart door lock, alarm system and the remote home management feature. Thus, we can say that the benefits of our product outweighs the costs and is worth developing. 

# 2. Hardware and Cloud Infrastructure Needed

## Hardware:

* RC552 RFID Module: Used to simulate the the door key
* LEDs: Used to simulate indoor lighting activation, also as visual feedback such as correct/incorrect key, locked/unlocked
* DC Fan: Simulate a AC system or ceiling fan that is enabled or disabled when leaving or entering
* Transistor: Driving the DC Fan

All items are included with our kits

## Cloud Infrastructure:

Instead of creating a native app the interface will be accessed from a webpage, and notifications (like an alarm for instance) will be triggered from the Argon.

# 3. Unknowns and Challenges

There are a number of elements we are yet to figure out. With this class we have not yet used the RC552 RFID module for instance. While we assume documentation can be found this is still a major unknown as far as how it will work with our actual implementation. There are also likely to be a large number of tweaking that will be required with other elements. Overall this project brings together many seperate elements that must work smoothly together and getting this to work effectively will likely be quite a challenge.

# 4. User Stories & Usage Scenarios

* Oliver is at work and there is a stanger lingering around his house. The alarm rings and Oliver is notified via his smartphone that there has been unwanted activity detected.
* Oliver is at his home and is expecting a visitor to have dinner with him. He would like to give a tour of his front garden and does not want the smart alarm to ring. Oliver turns off the alarm feature.
* Oliver is at leaving his workplace during summer to go home and he wants his house to be cool when he arrives. He can turn on the AC via his smartphone or set a time for it to start automatically.
* Oliver is watching a movie and wants to turn off the lights without moving after the movie is finished. He can press the off button or can also set a time to automatically urn off the lights.

# 5. Paper Prototypes

![Image of Prototype](https://github.com/CSE222S/project-hamic_kim_project/raw/main/docs/proposal/diagrams/prototype.jpeg)

# 6. Implementation: Sequence Diagrams

The following image shows a generalized interaction between the user's smartphone and the Argon. When a user presses a button on the interface, for example to unlock the door, this is sent to the Argon with the Particle cloud facilitating the connection. After the Argon runs the specified function, with our example it would unlock the door, the Argon would send its updated state to the web UI. In the case that the Argon has a state change without input from the web UI the first two steps are skipped as it publishes the event to Particle, with any active web UIs updating appropriately.
![Sequence Diagram 1](https://raw.githubusercontent.com/CSE222S/project-hamic_kim_project/main/docs/proposal/diagrams/alert-door-phone.png?token=ACJKS7Q2LFVQ2FKWZMCNOVK7Z4MXM)

There is also a case where the Argon would like to communicate with the phone when the user might not have the web application open, for example if the alarm is activated. For this situation IFTTT is leveraged to deliver the notification as shown in the diagram below.
![Sequence Diagram 2](https://raw.githubusercontent.com/CSE222S/project-hamic_kim_project/main/docs/proposal/diagrams/phone-particle-argon.png?token=ACJKS7V4TIH7HQEB6L74X3C7Z4SW4)

# 7. Plan and Schedule

## Weekly Schedule / Progress

| Week End     | Deliverables & Accomplishments |
|:-------------|:-------------------------------|
| By Dec. 4    | Implement some UI(javascript)  |
| By Dec. 11   |  Security Features finished    |
| Dec. 16      |  Complete Project Due!         |

## Group Member Responsibilities (Groups only)

| Name         | Responsibilities |
|:-------------|:-----------------|
|  Jooho Kim   | Security Feature |
|  Will Hamic  | Utility Feature  |
