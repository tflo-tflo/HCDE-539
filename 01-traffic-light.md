[Index](index.html)

# 1: Traffic Lights
Create a simulation of a traffic light.

## Source files
* [Tinker source](https://www.tinkercad.com/things/753FnYBbkBY-01-traffic-light/editel?returnTo=https%3A%2F%2Fwww.tinkercad.com%2Fdashboard%2Fdesigns%2Fcircuits&sharecode=ZMm7zYvMayxsUarfw0B2N4YVmkvtIUCHHYaLj04mImo)
* [Schematic (PDF)](./source-files/01-schedmatic.pdf)

## Documentation
> Top down view of breadboard and Arduino
![](./assets/01-00001.jpg)

> Jumper wires connected to ground, digital pins 10 through 12
![](./assets/01-00002.jpg)

> Sequence of three closed circuits, one for each traffic light
![](./assets/01-00003.jpg)

> Helpful Pinout diagram
![](https://content.arduino.cc/assets/A000066-pinout.png)

> Circuit view
![](./source-files/01_traffic_light/01-circuit-view.png)

## Code

``` JS
const int ledRed = 12;
const int ledYellow = 11;
const int ledGreen = 10;

// the setup function runs once when you press reset or power the board
void setup() {
  // setup debugging
  Serial.begin(9600);

  // initialize digital led pins as an output.
  pinMode(ledRed, OUTPUT);
  pinMode(ledYellow, OUTPUT);
  pinMode(ledGreen, OUTPUT);
}

// the loop function runs over and over again forever
void loop() {
  // turn green light on for 4 secs, then turn off
  digitalWrite(ledGreen, HIGH);
  Serial.println("Green");
  delay(4000);
  digitalWrite(ledGreen, LOW);

  // turn green light on for 4 secs, then turn off
  digitalWrite(ledYellow, HIGH);
  Serial.println("Yellow");
  delay(4000);     
  digitalWrite(ledYellow, LOW);

  // turn green light on for 4 secs, then turn off
  digitalWrite(ledRed, HIGH);
  Serial.println("Red");
  delay(4000);
  digitalWrite(ledRed, LOW);
}
```


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
7. Did the schematic and circuit view documentation last, I'm guessing as projects get more complicated it might be good to plan it out in Tinkercad first