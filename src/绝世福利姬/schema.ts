export const Schema = z.object({
  粉丝数: z.coerce.number().prefault(85000).transform(v => _.clamp(v, 0, Infinity)),
  当前场景: z.string().prefault('自宅'),
  是否直播中: z.boolean().prefault(false),
  当前委托: z.record(z.string().describe('委托名称'), z.object({
    金主: z.string(),
    内容: z.string(),
  })).prefault({}),
});

export type Schema = z.output<typeof Schema>;
