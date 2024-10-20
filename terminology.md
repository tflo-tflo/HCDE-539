[Index](index.html)

# Terminology

<!-- ABCDEFGHIJKLMNOPQRSTUVXYZ -->

**ADC:** Analog-to-Digital Conversion (ADC) for Input - Arduinos typically operate with a 10-bit ADC (Analog-to-Digital Converter), which is used to convert the voltage from analog sensors (like a potentiometer or temperature sensor) into a digital value that the microcontroller can process.
* Why the mapping to 0–1023?
  * The 10-bit ADC converts the input voltage into a number ranging from 0 to 1023. This is because a 10-bit binary number can represent 1024 distinct values (2^10 = 1024).
    * 0 corresponds to 0V.
    * 1023 corresponds to the reference voltage (usually 5V for most Arduinos, or 3.3V for others).

**Amp:** `A`, 1 amp = 1 coulomb per 1 second.

**analogWrite():** analogWrite (pin, value); value takes integers between 0 and 255 (8-bit value). The analogWrite function has nothing to do with the analog pins or the analogRead function. The analogWrite() function, despite its name, doesn’t actually output a true analog signal but instead uses Pulse Width Modulation (PWM) to simulate an analog output. PWM works by rapidly turning the digital pin on and off, and the average voltage depends on the fraction of time the pin is "on" (this is known as the duty cycle).

**"bit":** In the context of analog-to-digital conversion (ADC), 10-bit refers to the resolution of the conversion process, or the number of discrete digital values that the ADC can output. Here’s what 10-bit means in this specific context:

Definition of 10-bit:
* A bit is the smallest unit of data in computing and can have a value of 0 or 1.
* A 10-bit ADC means that the digital value output by the ADC is represented by 10 binary digits (bits).
* With 10 bits, you can represent 2^10 different values, which equals 1024 distinct levels.

**Coulomb:** Unit of electric charge, `C`. A coulomb is holds the equivalent charge of 6.242 * 10^18 electrons. We use coulombs because one elecron's charge is miniscule (equivalent to -1.602 * 10^-19 C).

**Conductors:** Low levels of resistance/high conductivity, such as copper, gold, and silver.

**Current:** `I`, the flow of charged particles through a conductor, measured in amps.

**Diode:** A diode is a two-terminal electronic component that conducts current primarily in one direction (asymmetric conductance). It has low (ideally zero) resistance in one direction and high (ideally infinite) resistance in the other.

**Insulators:** Materials with high levels of resistance/low conductivity.

**Ohm's Law:** Linear relationship between current, voltage, and resistance. To calculate the current; `I = V/R`.

**Pull up:** ![](/assets/pull-up.webp)

**Pull down:** ![](/assets/pull-down.webp)

**PWM:** Arduinos don't have true analog output (DAC, or Digital-to-Analog Conversion). Instead, they simulate analog output using Pulse-Width Modulation (PWM) on specific pins. In this process, the Arduino rapidly switches the output pin on and off at a certain frequency. By varying the "on" time relative to the "off" time (the duty cycle), the average voltage output can be controlled. This mapping occurs because an 8-bit number can represent 256 different values (2^8 = 256). 
* Why the mapping to 0–255?
  * Arduino’s analogWrite() function takes an 8-bit value, which ranges from 0 to 255.
    * 0 corresponds to a 0% duty cycle (always off, or 0V).
    * 255 corresponds to a 100% duty cycle (always on, or 5V).

**Resistance:** `R`, measured in ohms (Ω).

**Resistors:** Slows down electrons due to the atomic makeup of a material. Electrons in the current are colliding with atoms and other electrons, which not slows down the entire current, but can also create a byproduct through the collisions, such as heat or light. Materials that have high resistance are called insulators. The level of resistance depends on the material, size, diameter, length, temperature, etc., of the conductor.

**Voltage:** Electromotive force. Difference in electric potential between two points. The higher the voltage, the higher the number of electrons getting pushed into the current. Measured in volts, denoted by a `V`. One volt is equivalent to 1 joule per 1 coulomb. 1 joule is equal to 1 Newton per 1 meter. 1 Newton is equivalent to the force needed to push a kilogram of mass (e.g. an apple) 1 meter per second squared. Without voltage, electrons move randomly, voltage pushes electrons *through* a circuit.