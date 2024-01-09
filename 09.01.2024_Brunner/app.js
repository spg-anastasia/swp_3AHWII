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
    return this.gewichtPar / (this.groesse * this.groesse);
  }
 set gewicht (gewichtPar){
 //gewicht in kg
 if(gewichtPar <1 || gewichtPar >500){
    throw new Error('ungültiges Gewicht');
}
    this.#gewicht = gewichtPar; }

get gewicht() {
    return this.#gewicht;}
}
p= new Person('Hans', 80, 1.8);
console.log(p.gewicht);
console.log(p.bmi);

