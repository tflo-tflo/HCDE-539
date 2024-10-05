[Index](index.html)

# 1: Traffic Lights

## Source files
* Arduino Sketch file: [01-traffic-light.ino](./source-files/01_traffic_light/01_traffic_light.ino)

## Documentation
> Top down view of breadboard and Arduino
![](./assets/01-00001.jpg)

> Jumper wires connected to ground, digital pins 10 through 12
![](./assets/01-00002.jpg)

> Sequence of three closed circuits, one for each traffic light
![](./assets/01-00003.jpg)

> Helpful Pinout diagram
![](https://content.arduino.cc/assets/A000066-pinout.png)

## Process

1. I went to Arduino's documentation to get a better view of the pinout diagram because I wanted to know how to reference a particular pin in the code. I didn't find anything quick so I asked Claude.ai "How do you refrence a specific pin on an Arduino board in your code"
2. Their breakdown was helpful:
   1. Digital pins uses the pin number directly (e.g. `13`)
   2. Analog pins has an `A` prefix
   3. Built-in LEDs uses `LED_BUILTIN`
3. For future reference, here's their [language documentation](https://docs.arduino.cc/language-reference/)
4. I duplicated the example Blink file but added three variables, one for each light
5. For the breadboard, I referenced the PDF in the class syllabus, I liked how orderly they had lined all the circuits
6. I adjusted the timing and removed the delays