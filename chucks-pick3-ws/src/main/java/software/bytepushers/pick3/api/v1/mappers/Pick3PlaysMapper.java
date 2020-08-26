package software.bytepushers.pick3.api.v1.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.domain.Pick3Plays;

@Component
@Mapper(componentModel="spring")
public interface Pick3PlaysMapper {
    @Mapping(source = "drawingDate", target = "date", dateFormat="yyyy-MM-dd")
    Pick3PlaysResponse pick3PlaysToPick3PlaysResponse(Pick3Plays pick3Plays);
}
