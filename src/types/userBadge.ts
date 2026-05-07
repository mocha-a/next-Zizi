
// ======================================================
// api Creator
// ======================================================
export interface Creator {
  id: number;
  name: string;
  picture_medium?: string;
  country?: string;
}

// ======================================================
// DB User
// ======================================================
export interface User {
  id: string;
  name: string;
  image?: string;
}

// ======================================================
// UI
// ======================================================
export interface BadgeUser {
  id: string;
  name: string;
  image?: string;
  country?: string;
}

// ======================================================
// Mapper
// ======================================================
export const mapCreatorToBadge = (c: Creator): BadgeUser => ({
  id: String(c.id),
  name: c.name,
  image: c.picture_medium,
  country: c.country,
});

export const mapUserToBadge = (u: User): BadgeUser => ({
  id: u.id,
  name: u.name,
  image: u.image,
});