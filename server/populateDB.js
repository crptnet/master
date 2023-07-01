function generateRandomData(date) {
    const assets = [
        {
            asset: "BNB",
            available: Math.random().toFixed(8),
            onOrder: "0.00000000",
            _id: generateRandomId(),
        },
        {
            asset: "USDT",
            available: Math.random().toFixed(8),
            onOrder: "0.00000000",
            _id: generateRandomId(),
        },
        {
            asset: "ATOM",
            available: Math.random().toFixed(8),
            onOrder: "0.00000000",
            _id: generateRandomId(),
        },
        {
            asset: "BUSD",
            available: Math.random().toFixed(8),
            onOrder: "0.00000000",
            _id: generateRandomId(),
        },
        {
            asset: "LUNA",
            available: Math.random().toFixed(8),
            onOrder: "0.00000000",
            _id: generateRandomId(),
        },
        {
            asset: "NEAR",
            available: Math.random().toFixed(8),
            onOrder: "0.00000000",
            _id: generateRandomId(),
        },
    ];

    if(Math.random() * 2){
        assets['ETH'] = (Math.random() * 12).toFixed(4)
    }
    
    const record = {
        ok: true,
        status: "success",
        data: {
            _id: generateRandomId(),
            user_id: generateRandomId(),
            keyPair_id: generateRandomId(),
            assets: [
                {
                    date: assets,
                    _id: generateRandomId(),
                    timestamp: new Date().toISOString(),
                },
            ],
            createdAt: date.toISOString(),
            updatedAt: date.toISOString(),
            __v: 0,
        },
    };

    return JSON.stringify(record, null, 2);
}

function generateRandomId() {
    let id = "";
    const characters = "abcdef0123456789";
    for (let i = 0; i < 24; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters[randomIndex];
    }
    return id;
}

const startDate = new Date('2023.01.01 21:20')
const record = generateRandomData(startDate);
console.log(record);
