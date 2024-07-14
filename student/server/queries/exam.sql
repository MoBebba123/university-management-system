CREATE PROCEDURE CountFailures(
  IN pruefungstextParam VARCHAR(200),
  IN studentIdParam VARCHAR(100),
)
BEGIN
  DECLARE done BOOLEAN DEFAULT FALSE;
  DECLARE currentExamId VARCHAR(100);
  DECLARE failureCount INT DEFAULT 0;

  DECLARE cursorRecords CURSOR FOR
    SELECT id
    FROM Notenspiegel
    WHERE pruefungstext = pruefungstextParam
      AND studentId = studentIdParam
      AND status = 'nicht bestanden';

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

  OPEN cursorRecords;

  read_loop: LOOP
    FETCH cursorRecords INTO currentExamId;

    IF done THEN
      LEAVE read_loop;
    END IF;

    SET failureCount = failureCount + 1;

    END LOOP;

  CLOSE cursorRecords;

  SELECT failureCount AS FailureCount;

END

