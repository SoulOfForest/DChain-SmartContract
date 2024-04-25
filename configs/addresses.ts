import { ethers } from "hardhat"
import { expandTo18Decimals } from "../utils/bignumber"

export const addresses = [
    {
        referrer: ethers.constants.AddressZero,
        address: "0xe164E49ED19DDBC32ce7Dd9DE7E28DF3b721B037",
        privateKey: "e319c5e9b28dbd1db0e2f627dd1491851e47a3eb0699bc3e615e5f9efa644571",
        amount: expandTo18Decimals(3000)
    },
    {
        referrer: "0xe164E49ED19DDBC32ce7Dd9DE7E28DF3b721B037",
        address: "0x73964F6F211D5a8428322EDFbDfEc72FF76D9fCd",
        privateKey: "54516da687bfa7ba7c115d3ed3155a099e0b40f89560a9e3dfb4d34ab1d61579",
        amount: expandTo18Decimals(2000)
    },
    {
        referrer: "0xe164E49ED19DDBC32ce7Dd9DE7E28DF3b721B037",
        address: "0x9ef6eBF5A3E71d7f89eAdb94c8EA4293E64E4B4e",
        privateKey: "8bdfc32ecd4adb9e2b3fc4c87b1ee75b43bd71916b65d4c3f7a8fdd33ac8283d",
        amount: expandTo18Decimals(2500)
    },
    {
        referrer: "0xe164E49ED19DDBC32ce7Dd9DE7E28DF3b721B037",
        address: "0xC99bE41D07a05B273E7de6140e3362c2B6208C06",
        privateKey: "e9f81761724a1dc1fc3266bfc258ce6ed8ae7c66ff3b0b76671d5a88be42fb47",
        amount: expandTo18Decimals(3500)
    },
    {
        referrer: "0x9ef6eBF5A3E71d7f89eAdb94c8EA4293E64E4B4e",
        address: "0xe81e043f36b6825C8A7A0Fa4B447b53178CC6985",
        privateKey: "f24c217dae759d87b4a0d138ab0bd3249966997c5103b4ad6a5da114778f8d52",
        amount: expandTo18Decimals(4000)
    },
    {
        referrer: "0xe81e043f36b6825C8A7A0Fa4B447b53178CC6985",
        address: "0xE765dC83962B19ADA9e14e9e43778d856Cdf468b",
        privateKey: "39dc2b151b811222203310b5dff256367fabf4eab0a96d65cf00f8c3a0ceded2",
        amount: expandTo18Decimals(2500)
    },
    {
        referrer: "0xE765dC83962B19ADA9e14e9e43778d856Cdf468b",
        address: "0xC06789429A00078d08d8D56465023C87eBC33DE6",
        privateKey: "cff31a6b34a2845aaa74d0df426afee75b39bddacb3233d02b145ba16a58961f",
        amount: expandTo18Decimals(3000)
    },
    {
        referrer: "0x73964F6F211D5a8428322EDFbDfEc72FF76D9fCd",
        address: "0x490483A68E4331215e67590EE24065164f3A7C81",
        privateKey: "55457793c0e70e897a8358a69475484581c0eec8d2fc3b30bf71ab84453a3156",
        amount: expandTo18Decimals(3000)
    },
    {
        referrer: "0xC99bE41D07a05B273E7de6140e3362c2B6208C06",
        address: "0xeEC5744b42bDeE4FB6A96cBcc23cA51E9729DCeD",
        privateKey: "888287c0d2465f2efd816a08d6689fd3a98f0fc714215a57d64c7a4cba4a4133",
        amount: expandTo18Decimals(3000)
    }
]