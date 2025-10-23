package com.ariari.ariari.commons.manager;

public class StringUtilsManager {
    /**
     * 테이블명으로부터 PK 컬럼명을 추출
     * 예: Member -> member_id, ProductReview -> product_review_id
     */
    public static String extractPrimaryKeyColumnOfTable(String tableName) {
        // CamelCase를 snake_case로 변환 후 _id 추가
        String snakeCase = tableName.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
        return snakeCase + "_id";
    }


}
