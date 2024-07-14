
-- aggregate the students based on each semester of the year
SELECT
    YEAR(created_at) AS year,
    CASE
        WHEN MONTH(created_at) BETWEEN 1 AND 6 THEN 'Spring'
        ELSE 'Fall'
    END AS semester,
    COUNT(*) AS new_students
FROM
    Studenten
GROUP BY
    year, semester
ORDER BY
    year, semester;
