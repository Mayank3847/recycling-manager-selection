CREATE TABLE candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  experience_years INT NOT NULL,
  skills TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE evaluations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  candidate_id INT NOT NULL,
  crisis_management TINYINT UNSIGNED NOT NULL,
  sustainability TINYINT UNSIGNED NOT NULL,
  team_motivation TINYINT UNSIGNED NOT NULL,
  evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_candidate_eval
    FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
    ON DELETE CASCADE
);

CREATE TABLE rankings (
  candidate_id INT PRIMARY KEY,
  total_score INT NOT NULL,
  rank_position INT,
  CONSTRAINT fk_candidate_rank
    FOREIGN KEY (candidate_id)
    REFERENCES candidates(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_eval_candidate ON evaluations(candidate_id);
CREATE INDEX idx_rank_score ON rankings(total_score DESC);

DELIMITER $$

CREATE TRIGGER trg_update_rankings
AFTER INSERT ON evaluations
FOR EACH ROW
BEGIN
  DECLARE total INT;
  SET total = NEW.crisis_management
            + NEW.sustainability
            + NEW.team_motivation;

  INSERT INTO rankings (candidate_id, total_score)
  VALUES (NEW.candidate_id, total)
  ON DUPLICATE KEY UPDATE total_score = total;
END$$

DELIMITER ;

-- Add this after the original trigger
DELIMITER $$

CREATE TRIGGER trg_update_rank_positions
AFTER UPDATE ON rankings
FOR EACH ROW
BEGIN
  DECLARE current_rank INT;
  
  SELECT COUNT(*) + 1 INTO current_rank
  FROM rankings
  WHERE total_score > NEW.total_score;
  
  UPDATE rankings
  SET rank_position = current_rank
  WHERE candidate_id = NEW.candidate_id;
END$$

DELIMITER ;

-- Run this after inserting evaluations
SET @rank = 0;
UPDATE rankings
SET rank_position = (@rank := @rank + 1)
ORDER BY total_score DESC;