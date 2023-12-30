import {IERC20 as IOpenZeppelinERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20 is IOpenZeppelinERC20 {
    function burn(uint256 amount) external;
}