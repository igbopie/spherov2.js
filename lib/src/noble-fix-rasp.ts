// @ts-ignore
import * as Gatt from 'noble/lib/hci-socket/gatt';

const ATT_OP_WRITE_RESP = 0x13;

Gatt.prototype.notify = function(
  serviceUuid: string,
  characteristicUuid: string,
  notify: boolean
) {
  const characteristic = this._characteristics[serviceUuid][characteristicUuid];
  const valueBuffer = new Buffer(2);
  valueBuffer.writeUInt16LE(0x01, 0);

  this._queueCommand(
    this.writeRequest(characteristic.endHandle, valueBuffer, false),
    function(data: any[]) {
      const opcode = data[0];
      if (opcode === ATT_OP_WRITE_RESP) {
        this.emit(
          'notify',
          this._address,
          serviceUuid,
          characteristicUuid,
          notify
        );
      }
    }.bind(this)
  );
};
