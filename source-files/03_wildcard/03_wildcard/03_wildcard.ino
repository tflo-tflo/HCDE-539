/*
 Original code from: 
 HC-SR04 example sketch https://create.arduino.cc/projecthub/Isaac100/getting-started-with-the-hc-sr04-ultrasonic-sensor-036380 by Isaac100
 With modifications on:
 - Serial output format
 */

const int trigPin = 9;
const int echoPin = 10;
char distanceString[20];
char buffer[100];

float duration, distance;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration*.0343)/2;
  dtostrf(distance, 6, 1, distanceString);
  sprintf(buffer, "Distance: %s cm", distanceString);
  Serial.println(buffer);
  delay(100);
}