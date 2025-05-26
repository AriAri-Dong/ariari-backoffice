package com.ariari.ariari.commons.validator;

import com.ariari.ariari.commons.exception.exceptions.MaxSizeExceededException;
import com.ariari.ariari.commons.exception.exceptions.NoSchoolAuthException;
import com.ariari.ariari.domain.club.Club;
import com.ariari.ariari.domain.club.clubmember.ClubMember;
import com.ariari.ariari.domain.club.clubmember.enums.ClubMemberRoleType;
import com.ariari.ariari.domain.member.Member;
import com.ariari.ariari.domain.recruitment.Recruitment;
import com.ariari.ariari.domain.school.School;

import java.util.List;

public class GlobalValidator {

    public static void hasSchoolAuth(Member member) {
        if (member == null || member.getSchool() == null) {
            throw new NoSchoolAuthException();
        }
    }


    public static void isLessThanMaxSize(List<?> list, int maxSize){
        if(list == null || list.isEmpty()){
            return;
        }
        if(list.size() > maxSize){
            throw new MaxSizeExceededException();
        }
    }

}
