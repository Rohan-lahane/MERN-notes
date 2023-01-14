const t = [1,2,3,4,5]
const [first,
    
    ...rest] =t;

console.log(rest)
const object3 =
{
    name: 
    {
        first : 'Rohan',
        last : 'Lahane',
    },
    grades: [1,2,3,4,5],
    department: 'IIITH',

    greet: function(str){
            console.log('hiii, this is ' + this.name.first + " " + this.name.last+ str)
    }
}

object3.secretNo = 6969
console.log(object3)

const sum = (p1, p2) =>
{
 return p1+ p2;
}
// object3.doProd = fuction(a,b)
// {
//         console.log( a * b)
// } 

const add = sum(5, 7)
console.log("the sum is ", add)

object3.greet(" bye")

const refermethod = object3.greet.bind(object3)
refermethod(" byeee")
// multiply(6,9)
// console.log("method call multiply "+ multiply(6,9))


class person{
    
    constructor(name, age){
        this.name2 = name
        this.age = age
    }

    sayhi (){
        console.log('i am a person named '+ this.name2)
    }
}

const rohan = new person('Rohan', 21)
rohan.sayhi()





