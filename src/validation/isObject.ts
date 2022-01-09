export default function isObject(entity: any) {
  return (
    typeof entity === 'object' && entity !== null && !Array.isArray(entity)
  );
}
