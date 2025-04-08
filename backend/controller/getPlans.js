const plan=require("../models/planModel");

async function getPlans() {
    const data=await plan.find();
    const arr=[];
    data.forEach(persondata =>{
    arr.push({
        id:persondata.id,
        name:persondata.name,
        price: persondata.price,
        duration: persondata.duration,
        features: persondata.features,
    memberCount: persondata.memberCount,
    popular: persondata.popular,
    });
    })
    return arr;
 }
 module.exports=getPlans;
