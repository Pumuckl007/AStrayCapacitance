---
layout: post.html
author: Maximilian Apodaca
title: Cart Transmission
description: A small 3D printed transmission.
publishDate: 2018-06-03
---

A few weeks ago I got the idea to build a line following cart. I had a bunch of motors and old bearings lying around but I did not want to purchase any new parts. I thought to myself, why don't I just 3D print a transmission and thus I got to work.

The Motor and Contains
---
The motor I used originally came from a worm gear transmission that had an 80:1 reduction, 9Nm stall torque, and a free spin RPM of 90. The desired speed of the cart was 0.5m/s and so a 12:1 gear ratio on the new transmission coupled with a 70mm diameter wheel would yield a free spin speed of 0.7m/s which is plenty fast for a small cart.

![Image of the referenced motor](/images/Cart-Transmission/Motor.jpg)

And with that we have a specification. A **12:1** transmission with a **70mm** diameter output.

Creating The Model
---
The first step in creating the transmission was to create a Model of the motor and bearing I was going to use. This was fairly standard. Each part was measured and duplicated in OnShape, a web based CAD program.

![Image of CADed motor and bearing](/images/Cart-Transmission/MotorAndBearing.jpg)

With these models I was able to lay out where the motor will sit in relation to the wheel. After creating the layout I started work on the gears.

### Gears
To start let us go over how to define a gear. In our case we will define a gear by a number of teeth, inner and outer diameters, and pressure angle.

![Gear Diagram](/images/Cart-Transmission/GearDiagram.svg)

The pressure angle of a gear is the angle at which the another gear pushes on the teeth of the first gear. That is at a pressure angle of 0&deg; the second gear would push exactly horizontal to the first gear while at a pressure angle of 90&deg; the second gear would push into the center of the first gear.

To make the worm wheel mesh with the worm gear the pressure angle must be correct and the worm wheel should be helical to follow the worm. Below is the sketch for the profile and the extruded section of the worm wheel. The worm wheel has a presure angle of 25&deg;.

![Gear Crossection](/images/Cart-Transmission/GearCrossection.jpg)

I determined the diameter of the gear based on the spacing of the worm and the number of teeth necessary. 12 teeth were needed to achieve a 12:1 reduction and the worm had a spacing of 5 mm per tooth. This yielded a 60 mm diameter for the worm wheel.

After determining these parameters I created a model of each of the gears in addition to adding in the back plate, additional supports, and spacers.

[![Transmission OnShape](/images/Cart-Transmission/TransmissionOnshape.jpg)][1]

## Simulating the Transmission

After completing the transmission I had no idea how strong the structure would be. So I turned to SimScale, a finite element analysis program, to determine if the transmission was strong enough. I went through using the defaults for most of the settings in addition to the material as PLA. Then I added where the transmission would be supported and where there would be loads on the transmission after which I ran the simulation.

![Transmission Loads](/images/Cart-Transmission/TransmissionLoads.jpg)

In the picture above the transmission supports the weight of the platform above and the weight of the motor while resting on the axle. These weight exerting areas are highlighted. After setting up the simulation I let it run which yielded a maximum deformation of 0.30 mm.

![Transmission Deformation](/images/Cart-Transmission/TransmissionDeformation.jpg)

## Printing and Assembling

After completing the simulated tests I went ahead and printed the transmission components and assembled them. The final result works as expected except that the friction between the 3D printed wheel and the ground was too little. To fix this I added a rubber bracelet as a tire which worked to improve the friction.

![Transmission Assembled](/images/Cart-Transmission/TransmissionDone.jpg)

## Model

The model is available on [Onshape](https://cad.onshape.com/documents/86fffa5e35544131f79278c4/w/783ba8745fe2f745e99e30d7/e/ca928e950240a706516087b2).

The simulations are available on [SimScale](https://www.simscale.com/projects/pumuckl007/supportwall/) in addition to an [article featuring the project](https://www.simscale.com/forum/t/3d-printed-transmission-support/82416)

[1]:https://cad.onshape.com/documents/86fffa5e35544131f79278c4/w/783ba8745fe2f745e99e30d7/e/ca928e950240a706516087b2
