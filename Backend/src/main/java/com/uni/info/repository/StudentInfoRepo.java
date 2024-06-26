package com.uni.info.repository;

import aj.org.objectweb.asm.commons.Remapper;
import com.uni.info.entity.StudentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentInfoRepo extends JpaRepository<StudentInfo , Long> {
    @Query("SELECT s , st FROM StudentInfo s JOIN Student st ON s.stu_id = st.studentId where s.academic_year = :academicYear ")
    List<Object[]> findGroupByYear(String academicYear);
    @Query("SELECT s, st FROM StudentInfo s JOIN Student st ON s.stu_id = st.studentId WHERE s.academic_year = :academic_year AND LOWER(s.selected_university) = LOWER(:selected_university) AND st.isActive = true")
    List<Object[]> findUniversity(String academic_year, String selected_university);
    @Query("Select s , st FROM StudentInfo s JOIN Student st ON s.stu_id = st.studentId where s.academic_year = :academicYear and s.selected_university = :selectedUniversity and s.language = :language AND st.isActive = true")

    List<Object[]> findLanguage(String academicYear, String selectedUniversity, String language);
    @Query("Select s , st FROM StudentInfo s JOIN Student st ON s.stu_id = st.studentId where s.stu_id = :stu_id")

    List<Object[]> findFriend(@Param("stu_id") Long stu_id);
    @Query("SELECT s FROM StudentInfo s WHERE s.stu_id = :stuId")
    Optional<StudentInfo> findStuById(@Param("stuId") Long stuId);
    @Query("Select s , st FROM StudentInfo s JOIN Student st ON s.stu_id = st.studentId where s.academic_year = :academicYear and s.selected_university = :selectedUniversity and s.selected_course = :selectedCourse and s.language = :language AND st.isActive = true")

    List<Object[]> findCourse(String academicYear, String selectedUniversity, String language, String selectedCourse);

    @Query("SELECT s FROM StudentInfo s WHERE s.stu_id = :stuId")
    List<Object[]> checkuser(Long stuId);
}
