// So liegt der Normalwert bei Männern laut Deutscher Gesellschaft für Ernährung
// im Intervall von 20 bis 25 kg / m², während er sich
// bei Frauen im Intervall von 19 bis 24 kg / m² befindet.

const namePar = document.getElementById('name');
        const geschlechtPar = document.getElementById('geschlecht');
        const gewichtPar = document.getElementById('gewicht');
        const groessePar = document.getElementById('groesse');
        const ergebnisElement = document.getElementById('ergebnis');

        class Person {
            /* Gewicht in kg, Größe in m */
            #name;
            #gewicht;
            #groesse;
            #geschlecht;

            constructor(namePar, gewichtPar, groessePar, geschlechtPar) {
                this.name = namePar;
                this.gewicht = gewichtPar;
                this.groesse = groessePar;
                this.geschlecht = geschlechtPar;
            }

            set name(namePar) {
                if (typeof namePar !== 'string') {
                    throw new Error('ungültiger Name');
                }
                if (namePar.length < 3) {
                    throw new Error('Name zu kurz');
                }
                this.#name = namePar;
            }

            set gewicht(gewichtPar) {
                // gewicht in kg
                if (gewichtPar < 10 || gewichtPar > 500) {
                    throw new Error('ungültiges Gewicht');
                }
                this.#gewicht = gewichtPar;
            }
            get gewicht() {
                return this.#gewicht;
            }
            set groesse(groessePar) {
                if (groessePar < 0.5 || groessePar > 3.0) {
                    throw new Error('ungültige Größe');
                }
                this.#groesse = groessePar;
            }

            set geschlecht(geschlechtPar) {
                if (typeof geschlechtPar !== 'string') {
                    throw new Error('geben Sie einen Buchstaben ein')
                }
                if (geschlechtPar.length !== 1) {
                    throw new Error('geben sie "w" für weiblich oder "m" für männlich ein')
                }
                this.#geschlecht = geschlechtPar;
            }
            get geschlecht() {
                return this.#geschlecht;
            }

            get bmi() {
                const nmbr = this.#gewicht / (this.#groesse * this.#groesse);
                return Math.round(nmbr * 10) / 10;
            }

            getGewichtkategorie() {
                const bmi = this.bmi;

                if (bmi < 18.5) {
                    return 'Untergewichtig';
                }

                if (bmi >= 18.5 && bmi < 25) {
                    return 'Normalgewichtig';
                }

                else if (bmi >= 25) {
                    return 'Übergewichtig';
                }
            }

            toString() {
                return `
                    Name: ${this.#name}
                    Geschlecht: ${this.#geschlecht}
                    Gewicht: ${this.#gewicht} kg
                    Größe: ${this.#groesse} m
                    BMI: ${this.bmi}
                    Kategorie: ${this.getGewichtkategorie()}
                `;
            }
        }

        function berechneBMI() {
            try {
                const name = namePar.value;
                const geschlecht = geschlechtPar.value.toLowerCase();
                const gewicht = parseFloat(gewichtPar.value);
                const groesse = parseFloat(groessePar.value);

                if (isNaN(gewicht) || isNaN(groesse) || gewicht <= 0 || groesse <= 0) {
                    alert('Bitte geben Sie gültige Werte für Gewicht und Größe ein.');
                    return;
                }

                const person = new Person(name, gewicht, groesse, geschlecht);
                ergebnisElement.innerHTML = `<p>${person.toString()}</p>`;
            } catch (error) {
                alert(error.message);
            }
        }