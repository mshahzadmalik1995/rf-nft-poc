import transferNFT from "../pages/utils/mint";

export async function register() {
  console.log("server started.......");
  await transferNFT();
}
