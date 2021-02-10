const GreeterContract = artifacts.require("Greeter");

contract("Greeter", () => {
    it ("has been deployed successfully", async () => {
        const greeter = await GreeterContract.deployed();
        assert (greeter, "contract failed to deploy");
    });

    it("returns 'Hello, World!'", async() => {

	const greeter = await GreeterContract.deployed();
	const expected = "Hello, World!";
	const actual = await greeter.greet();

	assert.equal(actual, expected, "Greeted with 'Hello, World!'");
    });

    describe ("greet()", () => {
	it ("returns 'Hello, World!'", async() => {

	    const greeter = await GreeterContract.deployed();
	    const expected = "Hello, World!";
	    const actual = await greeter.greet();

            assert.equal(actual, expected, "greeted with 'Hello, World!'");
	}); 

    });

    describe ("owner()", () => {
	it ("returns the address of the owner", async () => {

	    const greeter = await GreeterContract.deployed();
	    const owner = await greeter.owner();

	    assert (owner, "the current owner");

	});

    });

});

contract ("Greeter: update greeting", (accounts) => {
    describe ("setGreeting(string)", () => {
        describe ("when message is sent by the owner", () => {
            it ("sets greeting to passed in string", async() => { 
                const greeter = await GreeterContract.deployed()
                const expected = "The owner changed the message";
                
                await greeter.setGreeting(expected);
                const actual = await greeter.greet();

                assert.equal(actual, expected, "greeting updated");

            });

        });

        describe ("when message is sent by another account", () => {
            it ("does not set the greeting", async () => {
                const greeter = await GreeterContract.deployed();
                const expected = await greeter.greet();

                try {
                    await greeter.setGreeting("Not the owner", {from: accounts[1] });
                } catch (err) {
                    const errorMessage = "Ownable: caller is not the owner"
                    assert.equal (err.reason, errorMessage, "greeting should not update");
                    return;
                }
                assert (false, "greeting should not update");
        
            });

        });  

    })

});
