const input1 = document.getElementById('relay1');
const input2 = document.getElementById('relay2');
const input3 = document.getElementById('relay3');
const input4 = document.getElementById('relay4');

const updateRelays = async () => {
    try {
        let res = await axios.post('https://sih.mlsc.tech/relay');
        res = res.data;
        console.log(res);
        input1.checked = res.relay1;
        input2.checked = res.relay2;
        input3.checked = res.relay3;
        input4.checked = res.relay4
    } catch (err) {
        console.log(err);
    }
}

input1.addEventListener('change', async () => {
    try{
        let res = await axios.put('https://sih.mlsc.tech/relay', {
            relay: 0,
            value: input1.checked,
        });
        res = res.data;
        console.log(res.message);
        if(!(res.message === 'ok')) {
            console.log("response not ok");
            input1.checked = !input1.checked;
        }
        console.log(res);
    } catch (err) {
        input1.checked = !input1.checked;
        console.log(err);
    }
    
});

input2.addEventListener('change', async () => {
    try{
        let res = await axios.put('https://sih.mlsc.tech/relay', {
            relay: 1,
            value: input2.checked,
        });
        res = res.data;
        console.log(res.message);
        if(!(res.message === 'ok')) {
            console.log("response not ok");
            input2.checked = !input2.checked;
        }
        console.log(res);
    } catch (err) {
        input2.checked = !input2.checked;
        console.log(err);
    }
    
});


input3.addEventListener('change', async () => {
    try{
        let res = await axios.put('https://sih.mlsc.tech/relay', {
            relay: 2,
            value: input3.checked,
        });
        res = res.data;
        console.log(res.message);
        if(!(res.message === 'ok')) {
            console.log("response not ok");
            input3.checked = !input3.checked;
        }
        console.log(res);
    } catch (err) {
        input3.checked = !input3.checked;
        console.log(err);
    }
    
});

input4.addEventListener('change', async () => {
    try{
        let res = await axios.put('https://sih.mlsc.tech/relay', {
            relay: 3,
            value: input4.checked,
        });
        res = res.data;
        console.log(res.message);
        if(!(res.message === 'ok')) {
            console.log("response not ok");
            input4.checked = !input4.checked;
        }
        console.log(res);
    } catch (err) {
        input4.checked = !input4.checked;
        console.log(err);
    }
    
});

updateRelays();
console.log("Script loaded");