import crypto from "crypto";

export class PasswordEncrypt {
  private chaveAdicional: string;

  constructor() {
    this.chaveAdicional = process.env.CHAVE_ADICIONAL || "default_secret";
  }

  public encript(senha: string): string {
    const senhaComChave = senha + this.chaveAdicional;
    const hash = crypto.createHash("sha512").update(senhaComChave, "utf8").digest("hex");
    return hash;
  }
}