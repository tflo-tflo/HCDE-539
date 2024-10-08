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

  // turn yellow light on for 4 secs, then turn off
  digitalWrite(ledYellow, HIGH);
  Serial.println("Yellow");
  delay(4000);     
  digitalWrite(ledYellow, LOW);

  // turn red light on for 4 secs, then turn off
  digitalWrite(ledRed, HIGH);
  Serial.println("Red");
  delay(4000);
  digitalWrite(ledRed, LOW);
}