import { db } from "../db/index.js";

export function getWorkflows({ platform, country, limit, offset }) {
  return new Promise((resolve, reject) => {
    const params = [];
    const where = [];

    if (platform) {
      where.push("platform = ?");
      params.push(platform);
    }
    if (country) {
      where.push("country = ?");
      params.push(country);
    }

    const whereSql = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const sql = `
      SELECT workflow, platform, country,
             views, likes, comments,
             like_to_view_ratio, comment_to_view_ratio,
             replies, contributors,
             search_volume, trend_change_60d,
             source_id, last_seen_at
      FROM workflows
      ${whereSql}
      ORDER BY views DESC NULLS LAST
      LIMIT ? OFFSET ?
    `;

    params.push(Number(limit));
    params.push(Number(offset));

    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      const result = rows.map((r) => ({
        workflow: r.workflow,
        platform: r.platform,
        popularity_metrics: {
          views: r.views,
          likes: r.likes,
          comments: r.comments,
          like_to_view_ratio: r.like_to_view_ratio,
          comment_to_view_ratio: r.comment_to_view_ratio,
          replies: r.replies,
          contributors: r.contributors,
          search_volume: r.search_volume,
          trend_change_60d: r.trend_change_60d
        },
        country: r.country,
        source_id: r.source_id,
        last_seen_at: r.last_seen_at
      }));
      resolve(result);
    });
  });
}
