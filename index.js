const express = require("express");
const app = express();
const PORT = 5000;
app.use(express.json());

const customers = [
    {title:"田中", id:1},
    {title:"斉藤", id:2},
    {title:"橋本", id:3},
    {title:"鈴木", id:4}
]


app.listen(PORT, () =>{
    console.log('サーバーが起動しました。')
});

app.get("/", (req,res) => {
    res.send('講座を受講中');
});

app.get("/api/customers",(req,res) => {
    res.send(customers);
});
app.post("/api/customers",(req,res) => {
    const customer = {
        title:req.body.title,
        id: customers.length +1
    }
    customers.push(customer);
    res.send(customer);
});

app.put("/api/customers:id", (req,res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    customer.title = req.body.title;
    res.send(customer);
});

app.delete("/api/customers:id", (req,res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));

    const index = customers.indexOf(customer);
    customers.splice(index,1);

    res.send(customer);
});