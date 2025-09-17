package com.ariari.ariari.domain.system.image;

import com.ariari.ariari.commons.entity.SystemNoticeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SystemNoticeImageRepository extends JpaRepository<SystemNoticeImage, Long> {

    List<SystemNoticeImage> findAllByImageUriIn(List<String> uris);
}
