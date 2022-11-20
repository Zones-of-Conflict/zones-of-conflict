

async function loadContract() {
  var ABI = ///Copy paste your Smart Contract ABI
        var Addresss = ///Copy paste your Smart Contract Address inside '  '
          return await new window.web3.eth.Contract(ABI, Address);
}


async function load() {
  await loadweb3();
  window.contract = await loadContract();
}


load();
