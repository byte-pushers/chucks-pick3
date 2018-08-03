package software.bytepushers.pick3.api.v1.mappers;

import org.mapstruct.Mapper;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.domain.Pick3Plays;

@Mapper
public interface Pick3PlaysMapper {
    Pick3PlaysResponse pick3PlaysToPick3PlaysResponse(Pick3Plays pick3Plays);
}
