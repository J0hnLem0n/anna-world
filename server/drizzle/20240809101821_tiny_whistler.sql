CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`login` text,
	`hash` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_login_unique` ON `users` (`login`);