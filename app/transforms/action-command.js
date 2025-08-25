export default class ActionCommandTransform {
  deserialize(serialized, options) {
    return serialized;
  }

  serialize(deserialized, options) {
    return deserialized;
  }

  static create() {
    return new this();
  }
}
