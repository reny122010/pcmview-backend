export function stripMongooseProps<T extends Record<string, any>>(doc: T): T {
  if (doc == null || typeof doc !== 'object') return doc;
  // muta o objeto intencionalmente (evita cópia desnecessária)
  delete (doc as any)._id;
  delete (doc as any).__v;
  return doc;
}
