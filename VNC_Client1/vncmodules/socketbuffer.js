class SocketBuffer {
  constructor() {
    this.flush();
  }

  flush(keep = true) {
    if (keep && this.buffer?.length) {
      this.buffer = this.buffer.slice(this.offset);
      this.offset = 0;
    } else {
      this.buffer = new Buffer.from([]);
      this.offset = 0;
    }
  }

  toString() {
    return this.buffer.toString();
  }

  includes(check) {
    return this.buffer.includes(check);
  }

  pushData(data) {
    this.buffer = Buffer.concat([this.buffer, data]);
  }

  readInt32BE() {
    const data = this.buffer.readInt32BE(this.offset);
    this.offset += 4;
    return data;
  }

  readInt32LE() {
    const data = this.buffer.readInt32LE(this.offset);
    this.offset += 4;
    return data;
  }

  readUInt32BE() {
    const data = this.buffer.readUInt32BE(this.offset);
    this.offset += 4;
    return data;
  }

  readUInt32LE() {
    const data = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return data;
  }

  readUInt16BE() {
    const data = this.buffer.readUInt16BE(this.offset);
    this.offset += 2;
    return data;
  }

  readUInt16LE() {
    const data = this.buffer.readUInt16LE(this.offset);
    this.offset += 2;
    return data;
  }

  readUInt8() {
    const data = this.buffer.readUInt8(this.offset);
    this.offset += 1;
    return data;
  }

  readInt8() {
    const data = this.buffer.readInt8(this.offset);
    this.offset += 1;
    return data;
  }

  readNBytes(bytes, offset = this.offset) {
    return this.buffer.slice(offset, offset + bytes);
  }

  readRgbPlusAlpha(red, green, blue) {
    const colorBuf = this.buffer.slice(this.offset, this.offset + 3);
    this.offset += 3;
    return red === 0 && green === 1 && blue === 2
      ? Buffer.concat([colorBuf, new Buffer.from([255])]).readIntBE(0, 4)
      : Buffer.concat([
          colorBuf.slice(red, red + 1),
          colorBuf.slice(green, green + 1),
          colorBuf.slice(blue, blue + 1),
          new Buffer.from([255]),
        ]).readIntBE(0, 4);
  }

  applyGammaCorrection(value) {
    // Perform gamma correction (adjust as needed)
    return Math.pow(value / 255, 1.2) * 255;
  }

  readRgb16PlusAlpha(red, green, blue) {
    const colorBuf = this.buffer.slice(this.offset, this.offset + 2);
    this.offset += 2;

    // Extract RGB components from RGB565
    const rgb565Value = colorBuf.readUInt16LE(0);
    const redValue =
      this.applyGammaCorrection((rgb565Value & 0xf800) >> 8) * 1.2;
    const greenValue =
      this.applyGammaCorrection((rgb565Value & 0x07e0) >> 3) * 1;
    const blueValue =
      this.applyGammaCorrection((rgb565Value & 0x001f) << 3) * 0.8;
    // const redValue = (rgb565Value & 0xf800) >> 8; // 5 bits for red
    // const greenValue = (rgb565Value & 0x07e0) >> 3; // 6 bits for green
    // const blueValue = (rgb565Value & 0x001f) << 3; // 5 bits for blue

    // Combine the values into a single number
    return (redValue << 16) | (greenValue << 8) | blueValue;

    // return red === 0 && green === 1 && blue === 2
    //   ? Buffer.concat([colorBuf, new Buffer.from([255])]).readIntBE(0, 4)
    //   : Buffer.concat([
    //       colorBuf.slice(red, red + 1),
    //       colorBuf.slice(green, green + 1),
    //       colorBuf.slice(blue, blue + 1),
    //     ]).readIntBE(0, 3);
  }

  readRgbColorMap(red, green, blue, redMax, greenMax, blueMax) {
    const colorBuf = this.buffer.slice(this.offset, this.offset + 6);
    this.offset += 6;
    const redBytes = colorBuf.slice(red * 2, red * 2 + 2);
    const greenBytes = colorBuf.slice(green * 2, green * 2 + 2);
    const blueBytes = colorBuf.slice(blue * 2, blue * 2 + 2);
    const redColor = Math.floor((redBytes.readUInt16BE() / redMax) * 255);
    const greenColor = Math.floor((greenBytes.readUInt16BE() / greenMax) * 255);
    const blueColor = Math.floor((blueBytes.readUInt16BE() / blueMax) * 255);
    return Buffer.concat([
      new Buffer.from(redColor),
      new Buffer.from(greenColor),
      new Buffer.from(blueColor),
      new Buffer.from([255]),
    ]).readIntBE(0, 4);
  }

  readRgba(red, green, blue) {
    console.log(`red: ${red}, green: ${green}, blue: ${blue}`);
    if (red === 0 && green === 1 && blue === 2) {
      const data = this.buffer.readIntBE(this.offset, 4);
      this.offset += 4;
      return data;
    } else {
      const colorBuf = this.buffer.slice(this.offset, this.offset + 4);
      this.offset += 4;
      return Buffer.concat([
        colorBuf.slice(red, red + 1),
        colorBuf.slice(green, green + 1),
        colorBuf.slice(blue, blue + 1),
        colorBuf.slice(3, 4),
      ]).readIntBE(0, 4);
    }
  }

  readNBytesOffset(bytes) {
    const data = this.buffer.slice(this.offset, this.offset + bytes);
    this.offset += bytes;
    return data;
  }

  setOffset(n) {
    this.offset = n;
  }

  bytesLeft() {
    return this.buffer.length - this.offset;
  }

  async waitBytes(bytes, name) {
    if (this.bytesLeft() >= bytes) {
      return;
    }
    let counter = 0;
    while (this.bytesLeft() < bytes) {
      counter++;
      // console.log('Esperando. BytesLeft: ' + this.bytesLeft() + '  Desejados: ' + bytes);
      await this.sleep(4);
      if (counter === 100) {
        console.log(
          `Stucked on ${name}  -  Buffer Size: ${
            // eslint-disable-line no-console
            this.buffer.length
          }   BytesLeft: ${this.bytesLeft()}   BytesNeeded: ${bytes}`
        );
      }
    }
  }

  fill(data) {
    this.buffer.fill(data, this.offset, this.offset + data.length);
    this.offset += data.length;
  }

  fillMultiple(data, repeats) {
    this.buffer.fill(data, this.offset, this.offset + data.length * repeats);
    this.offset += data.length * repeats;
  }

  sleep(n) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, n);
    });
  }
}

module.exports = SocketBuffer;
