import { NETWORKS } from "unchained-bitcoin"
import { accountDerivationPath, humanReadableDerivationPath } from "./paths"
import Purpose from "./purpose"

describe("humanReadableDerivationPath", () => {
  test("Legacy", () => {
    expect(humanReadableDerivationPath({ bip32Path: "m/44'/0'/0'/0/1" })).toBe(
      "Account #1 (Legacy)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/44'/0'/1'/0/1" })).toBe(
      "Account #2 (Legacy)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/44'/0'/2'/0/1" })).toBe(
      "Account #3 (Legacy)"
    )
  })
  test("SegWit", () => {
    expect(humanReadableDerivationPath({ bip32Path: "m/49'/0'/0'/0/1" })).toBe(
      "Account #1 (SegWit)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/49'/0'/1'/0/1" })).toBe(
      "Account #2 (SegWit)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/49'/0'/2'/0/1" })).toBe(
      "Account #3 (SegWit)"
    )
  })
  test("Native SegWit", () => {
    expect(humanReadableDerivationPath({ bip32Path: "m/84'/0'/0'/0/1" })).toBe(
      "Account #1 (Native SegWit)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/84'/0'/1'/0/1" })).toBe(
      "Account #2 (Native SegWit)"
    )
    expect(humanReadableDerivationPath({ bip32Path: "m/84'/0'/2'/0/1" })).toBe(
      "Account #3 (Native SegWit)"
    )
  })
  test("empty path", () => {
    expect(() => {
      humanReadableDerivationPath({ bip32Path: "" })
    }).toThrow()
  })
})

describe("accountDerivationPath", () => {
  test("testnet derivation paths", () => {
    expect(
      accountDerivationPath({ purpose: Purpose.P2PKH, accountNumber: 0 })
    ).toBe("m/44'/1'/0'")
    expect(
      accountDerivationPath({ purpose: Purpose.P2SH, accountNumber: 0 })
    ).toBe("m/49'/1'/0'")
    expect(
      accountDerivationPath({ purpose: Purpose.P2WPKH, accountNumber: 0 })
    ).toBe("m/84'/1'/0'")
  })
  test("mainnet derivation paths", () => {
    expect(
      accountDerivationPath({
        purpose: Purpose.P2PKH,
        accountNumber: 0,
        network: NETWORKS.MAINNET,
      })
    ).toBe("m/44'/0'/0'")
    expect(
      accountDerivationPath({
        purpose: Purpose.P2SH,
        accountNumber: 0,
        network: NETWORKS.MAINNET,
      })
    ).toBe("m/49'/0'/0'")
    expect(
      accountDerivationPath({
        purpose: Purpose.P2WPKH,
        accountNumber: 0,
        network: NETWORKS.MAINNET,
      })
    ).toBe("m/84'/0'/0'")
  })
})
