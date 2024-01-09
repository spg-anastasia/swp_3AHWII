class Person{
    #name;
    #gewicht;
    #groesse;
    constructor(name, gewichtPar , groesse){
    this.name =name;
    this.gewicht= gewichtPar;
    this.groesse= groesse;
}
  get bmi() {
    const bmiValue= this.gewicht / (this.groesse * this.groesse);
    return parseFloat(bmiValue.toFixed(1));
  }

  set groesse (groesse){
    //grösse in m
    if(groesse < 0.5|| groesse > 3){
        throw new Error('ungültige Grösse');
    }
    this.#groesse = groesse;
  }
 set gewicht (gewichtPar){
 //gewicht in kg
 if(gewichtPar < 1 || gewichtPar > 500){
    throw new Error('ungültiges Gewicht');
}
    this.#gewicht = gewichtPar; }

get gewicht() {
    return this.#gewicht;}
}
p= new Person('Hans', 80, 1.8);
console.log(p.gewicht);
console.log(p.bmi);

