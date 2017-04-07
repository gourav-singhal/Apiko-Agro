import { normalize, schema } from 'normalizr';

export default (keyField = 'id', arrObj) => {
  const preparedData = { collection: arrObj };
  const item = new schema.Entity('collection', {}, { idAttribute: keyField });
  const normalized = normalize(preparedData, { collection: [item] });
  const result = {
    values: normalized.entities.collection || {},
    keys: normalized.result.collection || [],
  };

  return (result);
};

