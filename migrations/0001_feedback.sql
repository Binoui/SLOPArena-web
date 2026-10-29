CREATE TABLE feedback (
  id INTEGER PRIMARY KEY,
  received_at TEXT NOT NULL,
  language TEXT NOT NULL,
  topic TEXT,
  favorite_character TEXT,
  record_json TEXT NOT NULL CHECK (json_valid(record_json))
);

CREATE INDEX feedback_received_at ON feedback (received_at);
