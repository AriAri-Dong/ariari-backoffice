package com.ariari.ariari.domain.member.member;

import com.ariari.ariari.commons.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query("select m from Member m join fetch m.authorities where m.id= :id")
    Optional<Member> findByIdWithAuthorities(Long id);

    Optional<Member> findByKakaoId(Long kakaoId);

    @Query("select m from Member m left join fetch m.clubBookmarks where m.id= :id")
    Optional<Member> findByIdWithClubBookmarks(Long id);

    @Query("select m from Member m left join fetch m.recruitmentBookmarks where m.id= :id")
    Optional<Member> findByIdWithRecruitmentBookmarks(Long id);

    Optional<Member> findByNickName(String nickname);

    boolean existsByNickName(String nickname);

    @Query("select m from Member m where m.nickName like %:nickname% order by m.nickName asc limit 20")
    List<Member> find20ByNickNameContains(String nickname);

    Long countByCreatedDateTimeAfter(LocalDateTime dateTime);

    Long countByCreatedDateTimeBefore(LocalDateTime dateTime);

    // Member registration/withdrawal queries
    Long countByCreatedDateTimeBetween(LocalDateTime start, LocalDateTime end);

    @Query("SELECT COUNT(m) FROM Member m WHERE m.deletedDateTime BETWEEN :start AND :end")
    Long countWithdrawalByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT DATE(m.createdDateTime) as date, COUNT(m) as count " +
           "FROM Member m " +
           "WHERE m.createdDateTime BETWEEN :start AND :end " +
           "GROUP BY DATE(m.createdDateTime) " +
           "ORDER BY date")
    List<Object[]> getDailySignupCountByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT DATE(m.deletedDateTime) as date, COUNT(m) as count " +
           "FROM Member m " +
           "WHERE m.deletedDateTime BETWEEN :start AND :end " +
           "GROUP BY DATE(m.deletedDateTime) " +
           "ORDER BY date")
    List<Object[]> getDailyWithdrawalCountByDateRange(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

}
