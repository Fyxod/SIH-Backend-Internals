const input1 = document.getElementById('relay1');
const input2 = document.getElementById('relay2');
const input3 = document.getElementById('relay3');
const input4 = document.getElementById('relay4');
const input5 = document.getElementById('relay5');
const input6 = document.getElementById('relay6');
const input7 = document.getElementById('relay7');
const input8 = document.getElementById('relay8');
const baseUrl = 'http://localhost:4141/relay';
const updateRelays = async () => {
    try {
        let res = await axios.post(baseUrl);
        res = res.data;
        console.log(res.data);
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
        let res = await axios.put(baseUrl, {
            relay: 1,
            value: input1.checked,
            field: 1
        });
        res = res.data;
        console.log(res.data);
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
        let res = await axios.put(baseUrl, {
            relay: 2,
            value: input2.checked,
            field: 1
        });
        res = res.data;
        console.log(res.data);
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
        let res = await axios.put(baseUrl, {
            relay: 3,
            value: input3.checked,
            field: 1
        });
        res = res.data;
        console.log(res.data);
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
        let res = await axios.put(baseUrl, {
            relay: 4,
            value: input4.checked,
            field: 1
        });
        res = res.data;
        console.log(res.data);
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

input5.addEventListener('change', async () => {
    try{
        let res = await axios.put(baseUrl, {
            relay: 1,
            value: input5.checked,
            field: 2
        });
        res = res.data;
        console.log(res.data);
        console.log(res.message);
        if(!(res.message === 'ok')) {
            console.log("response not ok");
            input5.checked = !input5.checked;
        }
        console.log(res);
    } catch (err) {
        input5.checked = !input5.checked;
        console.log(err);
    }
    
});

input6.addEventListener('change', async () => {
    try{
        let res = await axios.put(baseUrl, {
            relay: 2,
            value: input6.checked,
            field: 2
        });
        res = res.data;
        console.log(res.data);
        console.log(res.message);
        if(!(res.message === 'ok')) {
            console.log("response not ok");
            input6.checked = !input6.checked;
        }
        console.log(res);
    } catch (err) {
        input6.checked = !input6.checked;
        console.log(err);
    }
    
});

input7.addEventListener('change', async () => {
    try{
        let res = await axios.put(baseUrl, {
            relay: 3,
            value: input7.checked,
            field: 2
        });
        res = res.data;
        console.log(res.data)
        console.log(res.message);
        if(!(res.message === 'ok')) {
            console.log("response not ok");
            input7.checked = !input7.checked;
        }
        console.log(res);
    } catch (err) {
        input7.checked = !input7.checked;
        console.log(err);
    }
    
});

input8.addEventListener('change', async () => {
    try{
        let res = await axios.put(baseUrl, {
            relay: 4,
            value: input8.checked,
            field: 2
        });
        res = res.data;
        console.log(res.data)
        console.log(res.message);
        if(!(res.message === 'ok')) {
            console.log("response not ok");
            input8.checked = !input8.checked;
        }
        console.log(res);
    } catch (err) {
        input8.checked = !input8.checked;
        console.log(err);
    }
    
});

updateRelays();
console.log("Script loaded");