/*
 Original code from: 
 HC-SR04 example sketch https://create.arduino.cc/projecthub/Isaac100/getting-started-with-the-hc-sr04-ultrasonic-sensor-036380 by Isaac100
 With modifications on:
 - Serial output format
 */

const int trigPin = 9; // The sensor will "trigger" a small sound
const int echoPin = 10; // The sensor will also receive the sound's echo
char distanceString[20]; // Temporary string storage
char serialOutput[100]; // Temporary string storage

float duration, distance;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW); // No sound is emitted 
  delayMicroseconds(2); // Buffer
  digitalWrite(trigPin, HIGH); // Send sound
  delayMicroseconds(10); // Send an 8 cycle sonic burst
  digitalWrite(trigPin, LOW); // Stop emitting sound

  duration = pulseIn(echoPin, HIGH); // First argument is the pin we're listening to when it's at the specified state in the second argument. It starts a timer when trigPin is HIGH then stops when trigPin state changes to LOW
  distance = (duration*.0343)/2; // speed = distance/time with sound of speed at 340meters/second. Divide by 2 since the sound is traveling twice, once to the object and again from the object.
  dtostrf(distance, 6, 1, distanceString); // To convert a floating point value to a string since the sprintf function can't accept float
  sprintf(serialOutput, "Distance: %s cm", distanceString); // string print format function to output a single line, arguments: string storage, string output with format specifiers, and variable you're inserting into the string 
  Serial.println(serialOutput);
  delay(500); // Slight delay for printing the output
}