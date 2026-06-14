/*
  Warnings:

  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Like` DROP FOREIGN KEY `Like_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Playlist` DROP FOREIGN KEY `Playlist_userId_fkey`;

-- DropForeignKey
ALTER TABLE `playlist_tracks` DROP FOREIGN KEY `playlist_tracks_playlistId_fkey`;

-- DropIndex
DROP INDEX `Playlist_userId_fkey` ON `Playlist`;

-- DropTable
DROP TABLE `Like`;

-- AddForeignKey
ALTER TABLE `Playlist` ADD CONSTRAINT `Playlist_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `playlist_tracks` ADD CONSTRAINT `playlist_tracks_playlistId_fkey` FOREIGN KEY (`playlistId`) REFERENCES `Playlist`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `recent_views` ADD CONSTRAINT `recent_views_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
