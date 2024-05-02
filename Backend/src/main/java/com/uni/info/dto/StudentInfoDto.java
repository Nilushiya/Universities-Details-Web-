package com.uni.info.dto;

import lombok.*;

@Data
@AllArgsConstructor
public class StudentInfoDto {
    private  Long studentInfoId;

    private String address;

    private String selectedUniversity;

    private String gender;

    private String language;

    private String selectedCourse;

    private Long stu_id;
}
