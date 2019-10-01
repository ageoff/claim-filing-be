CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `name` varchar(200),
  `password` varchar(200) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

INSERT INTO `users` (id, email, name, password) VALUES (1, 'adam', 'Adam Geoffrion', MD5('password'));

CREATE TABLE IF NOT EXISTS `claim_types` (
  `id` int(11) NOT NULL PRIMARY KEY PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

INSERT INTO `claim_types` (id, name) VALUES (1, 'Unemployment Benefits');

CREATE TABLE IF NOT EXISTS `user_claim_types` (
  `id` int(11) NOT NULL PRIMARY KEY PRIMARY KEY AUTO_INCREMENT,
  `claim_type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  CONSTRAINT fk_user_claim_types1 FOREIGN KEY (claim_type_id) REFERENCES claim_types(id)
  CONSTRAINT fk_user_claim_types2 FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO `user_claim_types` (claim_type_id, user_id) VALUES (1, 1);

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL PRIMARY KEY PRIMARY KEY AUTO_INCREMENT,
  `text` varchar(200) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW()
);

INSERT INTO `questions` (id, text) VALUES (1, 'Were you physically able to work four or more days during the week being claimed?');
INSERT INTO `questions` (id, text) VALUES (2, 'Did you receive any bonus pay during the week being claimed?');
INSERT INTO `questions` (id, text) VALUES (3, 'Did you refuse work during the week being claimed?');
INSERT INTO `questions` (id, text) VALUES (4, 'Did you work Sunday through Saturday, during the week being claimed?');

CREATE TABLE IF NOT EXISTS `claim_type_questions` (
  `id` int(11) NOT NULL PRIMARY KEY PRIMARY KEY AUTO_INCREMENT,
  `claim_type_id` int(11) NOT NULL,
  `question_id` int (11) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  CONSTRAINT fk_claim_type_questions1 FOREIGN KEY (claim_type_id) REFERENCES claim_types(id),
  CONSTRAINT fk_claim_type_questions2 FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO `claim_type_questions` (claim_type_id, question_id) VALUES (1, 1);
INSERT INTO `claim_type_questions` (claim_type_id, question_id) VALUES (1, 2);
INSERT INTO `claim_type_questions` (claim_type_id, question_id) VALUES (1, 3);
INSERT INTO `claim_type_questions` (claim_type_id, question_id) VALUES (1, 4);

CREATE TABLE IF NOT EXISTS `user_claims` (
  `id` int(11) NOT NULL PRIMARY KEY PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `status` VARCHAR(200) ENUM('incomplete', 'submitted', 'under review', 'approved', 'completed'),
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  CONSTRAINT fk_user_claims1 FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS `user_answers` (
  `id` int(11) NOT NULL PRIMARY KEY PRIMARY KEY AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_on` TIMESTAMP NOT NULL DEFAULT NOW() ON UPDATE NOW(),
  CONSTRAINT fk_user_answers1 FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_user_answers2 FOREIGN KEY (question_id) REFERENCES questions(id)
);
