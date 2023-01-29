package software.bytepushers.pick3.api.v1.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.domain.Pick3Plays;

/**
 * Mapper for the pick3 plays to the expected response in for for {@link Pick3PlaysResponse}
 */
@Mapper(componentModel = "spring")
public interface Pick3PlaysMapper {

    /**
     * The method implementation is responsible for converting the dta in expected response format.
     *
     * @param pick3Plays as a input
     * @return the expected response format
     */
    @Mapping(source = "drawingDate", target = "date", dateFormat = "yyyy-MM-dd")
    Pick3PlaysResponse pick3PlaysToPick3PlaysResponse(Pick3Plays pick3Plays);
}
