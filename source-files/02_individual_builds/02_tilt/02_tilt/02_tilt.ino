// Tilt sensor (digital input): Connect the tilt sensor (digital input) to your Arduino. Have your sketch continuously print out the tilt status of the sensor.

const int pinInput = 4; // Define which pin will receive input

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  // 1. Store the integer value as "digitalVal" 
  // 2. The value will be retrieved through our variable pinInput
  // 3. The function digitalRead returns "LOW" or "HIGH" values (digitalRead is input)
  // "HIGH" = a voltage greater than 3.0V is present at the pin (5V boards)
  // "LOW" = a voltage less than 1.5V is present at the pin (5V boards)
  int digitalVal = digitalRead(pinInput); 
  if (digitalVal == LOW) {
      Serial.println("Closed circuit"); // The ball is in the down position connecting both contacts
      delay(500); // so that the reading only occurs every half second
  }
  else {
    Serial.println("Open circuit"); // When the ball is moved away from the contacts, it opens the circuit
    delay(500);
  }
}