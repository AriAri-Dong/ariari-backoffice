package com.ariari.ariari.domain.admin.dashboard.cache;

import com.ariari.ariari.domain.admin.dashboard.dto.AllClubRankingBaseData;
import com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingBaseData;
import com.ariari.ariari.domain.admin.dashboard.dto.ClubRankingData;
import com.ariari.ariari.domain.admin.dashboard.dto.res.GetClubRankingRes;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClubRankingCacheService {

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;

    private static final String ALL_POPULAR_CLUB_RANKING_KEY = "club:ranking:all:popular";
    private static final String ALL_NEW_CLUB_RANKING_KEY = "club:ranking:all:new";
    private static final String INTERNAL_POPULAR_CLUB_RANKING_KEY = "club:ranking:internal:popular";
    private static final String INTERNAL_NEW_CLUB_RANKING_KEY = "club:ranking:internal:new";
    private static final String EXTERNAL_POPULAR_CLUB_RANKING_KEY = "club:ranking:external:popular";
    private static final String EXTERNAL_NEW_CLUB_RANKING_KEY = "club:ranking:external:new";

    private static final Duration TTL = Duration.ofHours(2); // 2시간 TTL (1시간 스케줄러 주기보다 조금 더 길게)

    public void saveClubRanking(List<ClubRankingBaseData> allPopularTop10ClubRankingDataList, List<ClubRankingBaseData> allNewTop10ClubRankingDataList,
                                List<ClubRankingBaseData> internalPopularTop10ClubRankingDataList, List<ClubRankingBaseData> internalNewTop10ClubRankingDataList,
                                List<ClubRankingBaseData> externalPopularTop10ClubRankingDataList, List<ClubRankingBaseData> externalNewPopularTop10ClubRankingDataList) {
        try {
            String jsonValue = objectMapper.writeValueAsString(allPopularTop10ClubRankingDataList);
            redisTemplate.opsForValue().set(ALL_POPULAR_CLUB_RANKING_KEY, jsonValue, TTL);
            jsonValue = objectMapper.writeValueAsString(allNewTop10ClubRankingDataList);
            redisTemplate.opsForValue().set(ALL_NEW_CLUB_RANKING_KEY, jsonValue, TTL);
            jsonValue = objectMapper.writeValueAsString(internalPopularTop10ClubRankingDataList);
            redisTemplate.opsForValue().set(INTERNAL_POPULAR_CLUB_RANKING_KEY, jsonValue, TTL);
            jsonValue = objectMapper.writeValueAsString(internalNewTop10ClubRankingDataList);
            redisTemplate.opsForValue().set(INTERNAL_NEW_CLUB_RANKING_KEY, jsonValue, TTL);
            jsonValue = objectMapper.writeValueAsString(externalPopularTop10ClubRankingDataList);
            redisTemplate.opsForValue().set(EXTERNAL_POPULAR_CLUB_RANKING_KEY, jsonValue, TTL);
            jsonValue = objectMapper.writeValueAsString(externalNewPopularTop10ClubRankingDataList);
            redisTemplate.opsForValue().set(EXTERNAL_NEW_CLUB_RANKING_KEY, jsonValue, TTL);

            log.info("동아리 랭킹 Redis 캐시 저장 완료");
        } catch (JsonProcessingException e) {
            log.error("동아리 랭킹 Redis 저장 실패", e);
            throw new RuntimeException("캐시 저장 실패", e);
        }
    }

    public GetClubRankingRes getClubRanking(String key) {
        try {
            String jsonValue = redisTemplate.opsForValue().get(key);
            if (jsonValue == null) {
                log.warn("Redis에서 동아리 랭킹 데이터를 찾을 수 없음");
                return null;
            }
            return objectMapper.readValue(jsonValue, GetClubRankingRes.class);
        } catch (JsonProcessingException e) {
            log.error("동아리 랭킹 Redis 조회 실패", e);
            return null;
        }
    }

    public AllClubRankingBaseData getAllClubRanking() {
        try {
            AllClubRankingBaseData result = new AllClubRankingBaseData();

            result.setAllPopularClubRankingBaseData(getClubRankingDataList(ALL_POPULAR_CLUB_RANKING_KEY));
            result.setAllNewClubRankingBaseData(getClubRankingDataList(ALL_NEW_CLUB_RANKING_KEY));
            result.setInternalPopularClubRankingBaseData(getClubRankingDataList(INTERNAL_POPULAR_CLUB_RANKING_KEY));
            result.setInternalNewClubRankingBaseData(getClubRankingDataList(INTERNAL_NEW_CLUB_RANKING_KEY));
            result.setExternalPopularClubRankingBaseData(getClubRankingDataList(EXTERNAL_POPULAR_CLUB_RANKING_KEY));
            result.setExternalNewClubRankingBaseData(getClubRankingDataList(EXTERNAL_NEW_CLUB_RANKING_KEY));

            return result;
        } catch (Exception e) {
            log.error("전체 동아리 랭킹 Redis 조회 실패", e);
            return null;
        }
    }

    private List<ClubRankingBaseData> getClubRankingDataList(String key) {
        try {
            String jsonValue = redisTemplate.opsForValue().get(key);
            if (jsonValue == null) {
                log.warn("Redis에서 동아리 랭킹 데이터를 찾을 수 없음: {}", key);
                return List.of();
            }
            return objectMapper.readValue(jsonValue,
                objectMapper.getTypeFactory().constructCollectionType(List.class, ClubRankingBaseData.class));
        } catch (JsonProcessingException e) {
            log.error("동아리 랭킹 Redis 조회 실패: {}", key, e);
            return List.of();
        }
    }

    public void deleteClubRanking(String key) {
        redisTemplate.delete(key);
        log.info("동아리 랭킹 Redis 캐시 삭제 완료");
    }

    public boolean existsClubRanking(String key) {
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }
}