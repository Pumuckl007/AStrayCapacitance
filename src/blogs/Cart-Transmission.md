---
layout: post.html
author: Maximilian Apodaca
title: Cart Transmission
description: A small 3D printed transmission.
publishDate: 2018-05-29
---

A few weeks ago I was confronted with a problem. I had a bunch of motors lying around and wanted to make a line following cart. The problem was that I did not want to purchase transmissions or other parts for this project. After some though I opted to 3D print the transmission and wheel assembly.

The Motor and Contains
---
The motor I used originally came from a worm gear transmission that had an 80:1 reduction, 9Nm stall torque, and a free spin RPM of 90. The desired speed of the cart was 0.5m/s and so a 12:1 gear ratio on the new transmission coupled with a 70mm diameter wheel would yield a free spin speed of 0.7m/s which would decrease when the motor is under load.

![Image of the referenced motor](/images/Cart-Transmission/Motor.jpg)

And with that we have a specification. A **12:1** transmission with a **70mm** diameter output.

Creating The Model
---
The first step in creating the transmission was to create a Model of the motor and bearing I was going to use. This was fairly standard and each part was measured and duplicated in OnShape.

![Image of CADed motor and bearing](/images/Cart-Transmission/MotorAndBearing.jpg)

With these models I was able to lay out where the motor will sit in relation to the wheel. After this layout I went about making gears.

### Gears
To start let us go over how to define a gear. In our case we will define a gear by a number of teeth, inner and outer diameters, and pressure angle.

![Gear Diagram](/images/Cart-Transmission/GearDiagram.svg)

The pressure angle the angle at which the other gear pushes. That is a pressure angle of 0&deg; would push exactly horizontal while a pressure angle of 90&deg; would push into the center of the gear.

However, in addition to the worm wheel there is the worm itself. This is defined by a spiral with the same pitch diameter. A cross section is depicted below.

![Worm Diagram](/images/Cart-Transmission/WormDiagram.svg)

After determining these perameters I created a modle of each of the gears in addition to adding in the blackplate, additional supports, and spacers.

![Transmission OnShape](/images/Cart-Transmission/TransmissionOnshape.png)
